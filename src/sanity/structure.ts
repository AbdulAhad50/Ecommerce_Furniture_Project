
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: { list: () => { (): any; new(): any; title: { (arg0: string): { (): any; new(): any; items: { (arg0: any): any; new(): any; }; }; new(): any; }; }; documentTypeListItems: () => any; }) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
