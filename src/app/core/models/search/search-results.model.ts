import { Link } from "../misc/link.model";
import { GitHubUserCustom } from "./github/github-user.model";

export interface SearchResults {
    /** Total Count of results */
    totalCount?: number;
    /** Github Users */
    items: GitHubUserCustom[];
    /** Navigation links, for example, back, next, first, etc. */
    links?: Link[],
    term?: string
}