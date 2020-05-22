import GrapesJS from 'grapesjs';
import {addSearchResultItemComponent} from './search-result-item.component';

export const addSearchResultPlugin = () => {
  GrapesJS.plugins.add('search-result', (editor : any, options: any) => {
  console.log("this ran")
  addSearchResultItemComponent(editor, options);
  editor.DomComponents.addType("search-result",{
    isComponent: (el: any) => {
       if(el.tagName === 'SearchResult' ){
        return {
          type : 'search-result'
        }
      }
    },
    model: {
      init() {
        // const me = (this as any)
        // me.on('component:update', () => {
        //   let html = "";         
        //   me.get('components').each((child : any) => {
        //     html+=child.toHTML({
        //       attributes : (a : any, attributes: any) => {
        //         return attributes;
        //       }
        //     })
        //   })

        //   me.addAttributes({
        //     searchResultItemTemplate:html
        //   })
 
        // })
      
      },
      defaults: {
        tagName:'div',
        attributes: {
          searchResultItemTemplate: ""
        },
        components: () => {
          return  {
            type: 'search-result-item'
          }
        },
        label: "defaultvalue",
        traits: [{
          label: 'Label',
          name: 'label',
          changeProp: 1
        }]
      },
      toHTML : function(a: any,b: any, c: any) {
        
        const me = (this as any)

          let html = "";         
          me.get('components').each((child : any) => {
            html+=child.toHTML()
        })
        // not a completelly correct way of doing this. 
        // because if we will need to do this second time in the tree this will fuck things up
        // but for now we don't want to loose time on it
        const serializedHTML = html.replace(/\"/g,"&quot;");
        const answer = `<div id="${me.ccid}" ><SearchResult searchResultItemTemplate="${serializedHTML}" /></div>`;
        return answer
      },
    }
  } );

    editor.BlockManager.add('search-result', {
      name:'search-result',
      label: 'Search Result',
      category: 'Search Result',
      content: {
        type: 'search-result',
      }

  });
})
}