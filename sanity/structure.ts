import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // CIE IGCSE Section
      S.listItem()
        .title('CIE IGCSE')
        .child(
          S.list()
            .title('CIE IGCSE Content')
            .items([
              // Homepage Section
              S.listItem()
                .title('Homepage')
                .child(
                  S.list()
                    .title('Homepage Sections')
                    .items([
                      // Hero Section
                      S.listItem()
                        .title('Hero Section')
                        .child(
                          S.documentTypeList('hero')
                            .title('Hero Section')
                            .filter('_type == "hero"')
                        ),
                      
                      // Subject Grid Section
                      S.listItem()
                        .title('Subject Grid Section')
                        .child(
                          S.documentTypeList('subjectGrid')
                            .title('Subject Grid Section')
                            .filter('_type == "subjectGrid"')
                        ),
                      
                      // Why Choose Us Section
                      S.listItem()
                        .title('Why Choose Us Section')
                        .child(
                          S.documentTypeList('whyChooseUs')
                            .title('Why Choose Us Section')
                            .filter('_type == "whyChooseUs"')
                        ),
                      
                      // FAQ Section
                      S.listItem()
                        .title('FAQ Section')
                        .child(
                          S.documentTypeList('faq')
                            .title('FAQ Section')
                            .filter('_type == "faq"')
                        ),
                    ])
                ),
              
              // Subject Pages
              S.listItem()
                .title('Subject Pages')
                .child(
                  S.list()
                    .title('Subject Pages')
                    .items([
                      // Maths Page (legacy)
                      S.listItem()
                        .title('Maths Page (Legacy)')
                        .child(
                          S.documentTypeList('mathsPage')
                            .title('Maths Page')
                            .filter('_type == "mathsPage"')
                        ),
                      
                      // Dynamic Subject Pages
                      S.listItem()
                        .title('Dynamic Subject Pages')
                        .child(
                          S.documentTypeList('subjectPage')
                            .title('Subject Pages')
                            .filter('_type == "subjectPage"')
                        ),
                    ])
                ),
            ])
        ),
      
      // Header
      S.listItem()
        .title('Header')
        .child(
          S.documentTypeList('header')
            .title('Header')
            .filter('_type == "header"')
        ),
      
      // Footer
      S.listItem()
        .title('Footer')
        .child(
          S.documentTypeList('footer')
            .title('Footer')
            .filter('_type == "footer"')
        ),
    ]) 