import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Constants } from "../../constants/constants";

/** Describes the basic shape and features of a Github Search Service */
export abstract class BaseGithubSearch {

    /** constant for the root Github Search API URI
     * If this API changed per environment, it would go in the environments file.
     * Or you could create a constants.ts if you prefer magic strings in a single file.
     */
    protected searchUriBase = 'https://api.github.com/search/users';
    constructor(protected http: HttpClient) { }
    /** 
    * Query the public Github User Search API with the given term.
    * @param term The user search term - Will be encoded before sending to the API.
    * @see https://docs.github.com/en/rest/reference/users
    */
    abstract search(term: string, ...args: any[]): Observable<any>

    /**
     * Get an object composed of standard request options
     * @returns An object containing standard request headers as requested by gh
     */
    protected withStandardRequestOptions() {
        return { headers: { accept: 'application/vnd.github.v3+json' } };
    }

    /**
     * 
     * @param term The search term to be encoded and included in the uri
     * @param since The last userid - results returned will have a higher id than this numb er
     * @param page  The page to fetch
     * @returns 
     */
    protected withSearchUri(term: string, since?: number, page?: number) {
        let endpoint = `${this.searchUriBase}?q=${encodeURIComponent(term)}&per_page=${Constants.PAGE_SIZE}`
        if (since && page) endpoint += `&since=${since}&page=${page}`;
        return endpoint;
    }
    
    protected fetch<T>(endpoint: string) {
        return this.http.get<T>(endpoint, this.withStandardRequestOptions());
    }

    protected fetchWithFullResponse<T>(endpoint: string) {
        return this.http.get<T>(endpoint, { ...this.withStandardRequestOptions(), observe: 'response' });
    }
 }