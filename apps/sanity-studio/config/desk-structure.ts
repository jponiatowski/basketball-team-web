import {DocumentsIcon, TiersIcon, DashboardIcon, DatabaseIcon} from '@sanity/icons'
import type {StructureBuilder} from 'sanity/structure'
import {camelCaseToRegular} from '../base/utils'
import {dataSchemaTypes} from '../schema-types/data'
import {layoutSchemaTypes} from '../schema-types/layout'
import {sectionSchemaTypes} from '../schema-types/sections'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Pages').icon(DocumentsIcon).child(S.documentTypeList('page')),
      S.listItem()
        .title('Layout')
        .icon(DashboardIcon)
        .child(
          S.list()
            .title('Layout')
            .items(
              layoutSchemaTypes.map((type) =>
                S.listItem()
                  .title(camelCaseToRegular(type.name))
                  .child(S.documentTypeList(type.name)),
              ),
            ),
        ),
      S.listItem()
        .title('Sections')
        .icon(TiersIcon)
        .child(
          S.list()
            .title('Sections')
            .items(
              sectionSchemaTypes.map((type) =>
                S.listItem()
                  // @ts-expect-error
                  .title(camelCaseToRegular(type.name))
                  // @ts-expect-error
                  .child(S.documentTypeList(type.name)),
              ),
            ),
        ),
      S.listItem()
        .title('Data')
        .icon(DatabaseIcon)
        .child(
          S.list()
            .title('Data')
            .items(
              dataSchemaTypes.map((type) =>
                S.listItem()
                  .title(camelCaseToRegular(type.name))
                  .child(S.documentTypeList(type.name)),
              ),
            ),
        ),
    ])
