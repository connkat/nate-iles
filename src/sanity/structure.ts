import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom Writing section
      S.listItem()
        .title('Writing')
        .child(
          S.list()
            .title('Writing')
            .items([
              // All writing
              S.listItem()
                .title('All')
                .child(
                  S.documentList()
                    .title('All Writing')
                    .filter('_type == "writing"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              // Dynamic: Writing by Category
              S.listItem()
                .title('By Category')
                .child(
                  S.documentTypeList('writingCategory')
                    .title('Writing by Category')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Writing')
                        .filter('_type == "writing" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                    )
                ),
            ])
        ),

      // Keep the rest of your types but hide the default Writing item
      ...S.documentTypeListItems().filter((li) => !['writing', 'writingCategory'].includes(li.getId() || '')),
    ])
