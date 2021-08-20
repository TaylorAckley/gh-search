import { Link } from "../misc/link.model";
import { GitHubUser } from "./github/github-user.model";

export interface SearchResults {
    /** Total Count of results */
    totalCount?: number;
    /** Github Users */
    items: GitHubUser[];
    /** Navigation links, for example, back, next, first, etc. */
    links?: Link[]
}