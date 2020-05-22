

export const addSearchResultItemTitleComponent =  (editor: any, options: any) => {

  editor.DomComponents.addType("search-result-item-title",{
    isComponent: (el : any) => {
       if(el.class === 'gjs-search-result-item-title' ){
        return {
          type : 'search-result-item-title'
        }
      }
    },
    model: {
      defaults: {
        tagName: 'div',
        attributes : {
          className:'gjs-search-result-item-title'
        },
        content: 'title'
      },
      toHTML : function() {
        const me = (this as any);
        return `<div id="${me.ccid}" >{title}</div>`;
      },
    }
  } );

}