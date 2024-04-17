const workercode = () => {

    self.onmessage = e => {

        const { data } = e;
        const { activities } = data;

        try {
            const newSingle: { name: string, value: number }[] = []
            activities.map((act: any) => {

                const nameSplit = act.sid.trim().split(' ');
                const length = nameSplit.length;
                const name = nameSplit[length - 1];

                newSingle.push({
                    name: name,
                    value: act.count
                })
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
export const activity_data_to_clicks_script = URL.createObjectURL(blob);