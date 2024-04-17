const workercode = () => {
  self.onmessage = e => {
    console.log("Worker is runing....")

    const { data } = e;
    const reader = new FileReader()

    reader.onloadend = () => {
      console.log("reader.onloadend....", reader.result)
      postMessage(reader.result)
    }
    reader.readAsDataURL(data)

    console.log("Worker code finished....")

  }
}

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
export const blob_to_base64_script = URL.createObjectURL(blob);