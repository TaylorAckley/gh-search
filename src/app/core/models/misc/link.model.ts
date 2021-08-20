export class Link {
    rel: LinkRel;
    href: string;
    constructor(rel: LinkRel, href: string) {
        this.rel = rel;
        this.href = href;
    }
}

export enum LinkRel {
    page = 'page',
    first = 'first',
    last = 'last',
    next = 'next'
 }