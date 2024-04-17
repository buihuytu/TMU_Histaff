/* THIS IS VERY IMPORT SCRIPT */
/* PLEASE DO NOT TOUCH */

const workercode = () => {

  self.onmessage = function (e) {

    const { data } = e;

    const list = data.list;
    const keyField = data.keyField;
    const titleField = data.titleField;
    const parentField = data.parentField;
    const activeField = data.activeField || 'active';
    const checkedField = data.checkedField || 'checked';
    const expandedField = data.expandedField || 'expanded';
    const status = data.status;
    const orderBy = data.orderBy || titleField;

    const listOriginalCopy = [...list];
    let maxTier = 0;

    list.map((item: any) => {
      item.tree$Key = item[keyField];
      item.tree$Title = item[titleField];
      item.tree$Parent = item[parentField];
      item.tree$Children = [];

      //extras
      item.tree$Tier = 1;
      item.tree$Path = '.' + item.tree$Key;
      item.tree$HasChildren = false;
      item.tree$HasActiveChildren = false;
      item.tree$HasGrandchildren = false;
      item.tree$Highlighted = false;
      item.tree$Selected = false;

      if (!!!status) {
        item.tree$Expanded = item[expandedField];
        item.tree$Active = item[activeField];
        item.tree$Checked = item[checkedField];
      } else {
        item.tree$Expanded = status.expandedKeys?.includes(item.tree$Key.toString());
        item.tree$Active = status.activeKeys?.includes(item.tree$Key.toString());
        item.tree$Checked = status.checkedKeys?.includes(item.tree$Key.toString());
      }

    })

    const rawList = JSON.parse(JSON.stringify(list));

    const sortFn = (a: any, b: any) => {
      if (a[orderBy] > b[orderBy]) return 1;
      if (a[orderBy] === b[orderBy]) return 0;
      if (a[orderBy] < b[orderBy]) return -1;
      return 0;
    }

    const loop = (currentParent: any) => {
      const key = currentParent.tree$Key;

      // select children for currentParent 
      const children = list.filter((c: any) => c.tree$Parent === key);

      if (!!children.length) {
        currentParent.tree$HasChildren = true;
        // also update liner item
        const filter = rawList.filter((x: any) => x.tree$Key === key)
        if (!!filter.length) {
          filter[0].tree$HasChildren = true;
        }

        // update grandpa if any
        const grandparents = listOriginalCopy.filter(x => x.tree$Key === currentParent.tree$Parent);
        if (!!grandparents.length) grandparents[0].tree$HasGrandchildren = true;
      }

      // select children for currentParent 
      const activeChildren = children.filter((c: any) => !!c.isActive);
      if (!!activeChildren.length) {
        currentParent.tree$HasActiveChildren = true;
      }

      let i = children.length;

      if (i > 0) {
        while (i--) {
          if (i < children.length) {
            const child = children[i];
            currentParent.tree$Children.push(child);
            const index = list.indexOf(child);
            if (index > -1) list.splice(index, 1);
          }
        }
      }

      i = currentParent.tree$Children.length;
      currentParent.tree$Children.sort(sortFn)
      if (i > 0) {
        while (i--) {
          if (i < currentParent.tree$Children.length) {
            const child = currentParent.tree$Children[i];
            loop(child);
          }
        }
      }

    }

    // NEW CHANGE ON Sep 3rd 2023
    const loopUpdateTierAndPath = (currentParent: any) => {
      const tier = currentParent.tree$Tier;
      const path = currentParent.tree$Path;

      const children = currentParent.tree$Children
      children.map((child: any) => {
        child.tree$Tier = tier + 1;
        if (maxTier < tier + 1) maxTier = tier + 1;

        child.tree$Path = path + "." + child.tree$Key;

        loopUpdateTierAndPath(child);

      })

    }

    try {
      var i = list.length;
      if (i > 0) {
        while (i--) {
          if (i < list.length) {
            const item = list[i];
            loop(item);
          }
        }
      }
      
      list.map((item: any) => {
        loopUpdateTierAndPath(item);
      })
      

    } catch (error) {

      console.error(error)

      postMessage({
        list: [],
        rawList: [],
        maxTier
      });
    }

    postMessage({
      list,
      rawList,
      maxTier
    });

  }
}

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
export const liner_to_nested_array_script = URL.createObjectURL(blob);