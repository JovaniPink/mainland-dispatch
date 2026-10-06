import { publishedDispatches, toPublicDispatch } from "@/content/dispatches";
import {
  publicDiscovery,
  discoveryInquiries,
  publicArchiveCatalog,
} from "@/content/public-discovery";
import { ArchiveExplorerClient } from "./archive-explorer-client";

/** Build-time public projection: private catalog records never become client props. */
export function ArchiveExplorer() {
  return (
    <ArchiveExplorerClient
      records={publishedDispatches
        .filter((record) => record.provenance === "verified")
        .map(toPublicDispatch)}
      entries={discoveryInquiries}
      data={publicDiscovery}
      catalog={publicArchiveCatalog}
    />
  );
}
