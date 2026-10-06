import fs from "node:fs";
import path from "node:path";

const css = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8"
);
function rgb(hex: string) {
  return [1, 3, 5].map(
    (offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255
  );
}
function luminance(color: number[]) {
  return color
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, index) => sum + c * [0.2126, 0.7152, 0.0722][index], 0);
}
function ratio(a: number[], b: number[]) {
  const l = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l[0] + 0.05) / (l[1] + 0.05);
}

it.each([":root", '[data-theme="night"]'])(
  "keeps accent text above the unrounded 4.5 threshold on %s surfaces",
  (selector) => {
    const block = css.slice(css.indexOf(selector)).split("}")[0];
    const token = (name: string) =>
      rgb(block.match(new RegExp(`--${name}: (#[a-f0-9]{6})`))![1]);
    const paper = token("paper");
    for (const background of [
      "paper",
      "paper-warm",
      "signal-soft",
      "jade-soft",
    ]) {
      for (const opacity of [0.2, 0.3, 0.6, 1]) {
        const surface = token(background).map(
          (c, i) => c * opacity + paper[i] * (1 - opacity)
        );
        expect(ratio(token("signal"), surface)).toBeGreaterThanOrEqual(4.5);
        expect(ratio(token("focus"), surface)).toBeGreaterThanOrEqual(3);
      }
    }
  }
);

it("keeps fixed media text legible in both themes", () => {
  for (const text of ["#f3f0e8", "#9ab9af", "#d8aaa5", "#c9cec9"])
    expect(ratio(rgb(text), rgb("#17201d"))).toBeGreaterThanOrEqual(4.5);
  expect(ratio(rgb("#f19589"), rgb("#17201d"))).toBeGreaterThanOrEqual(3);
  expect(ratio(rgb("#f3f0e8"), rgb("#bd382d"))).toBeGreaterThanOrEqual(4.5);
});
