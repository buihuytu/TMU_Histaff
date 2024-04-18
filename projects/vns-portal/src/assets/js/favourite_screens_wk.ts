const workercode = () => {

    self.onmessage = e => {

        const { data } = e;
        const { currentSingle, activities } = data;

        const sortFn = (a: any, b: any) => {
            if (a.pathCount > b.pathCount) return 1;
            if (a.pathCount === b.pathCount) return 0;
            if (a.pathCount < b.pathCount) return -1;
            return 0;
        }

        try {
            const newSingle: { name: string, value: number }[] = currentSingle || []
            activities.filter((x: any) => x.pathname.split('/').length < 4).sort(sortFn).filter((_: any, index: any) => index < 10).map((act: any) => {

                const name = act.pathname;

                var filter = newSingle.filter(x => x.name === name);

                if (!!filter.length) {
                    filter[0].value = filter[0].value! + 100
                } else {
                    newSingle.push({
                        name: name,
                        value: (act.pathCount || 0 ) + 100
                    })
                }

            })

            postMessage({
                single: newSingle
            });


        } catch (error) {

            console.error(error)

            postMessage(null);
        }

    }
}

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
export const favourite_screens_script = URL.createObjectURL(blob);