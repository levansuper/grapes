import {addSearchResultItemTitleComponent} from './search-result-item-title.component';
import {addSearchResultItemImageComponent} from './search-result-item-image.component';
export const addSearchResultItemComponent =  (editor: any, options: any) => {
  addSearchResultItemTitleComponent(editor, options);
  addSearchResultItemImageComponent(editor, options);
  editor.DomComponents.addType("search-result-item",{
    isComponent: (el : any) => {
       if(el.class === 'gjs-search-result-item' ){
        return {
          type : 'search-result-item'
        }
      }
    },
    model: {
      defaults: {
        tagName: 'div',
        attributes : {
          className:'gjs-search-result-item'
        },
        components: () => {
          return [{
            type: 'search-result-item-title'
          },{
            type: 'search-result-item-image'
          }]
        }

      }
    }
  } ); 

}