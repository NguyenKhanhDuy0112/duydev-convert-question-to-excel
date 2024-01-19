import JoditEditor from "jodit-react"
import ModalMedia from "../ModalMedia"
import { useModal } from "@/hooks"
import { CookieStorageKey, env } from "@/constants"
import { useRef } from "react"
import { cookiesStorage } from "@/helpers/cookieStorage"

interface TextEditorProps {
    value: string
    onChange: (content: string) => void
}

interface JoditUploaderConfig {
    url: string
    prepareData: (data: FormData, file: File, files: File[]) => void
    selection?: any
    file?: any
    // Add any other uploader properties you may use
}

function TextEditor(props: TextEditorProps) {
    const { value, onChange } = props
    const { visible: visible, toggle: onToggle } = useModal()
    const editor = useRef<any>(null)

    const config: any = {
        height: 600,
        subject: "Text Editor", // Add the subject prop
        events: {
            afterCommand: (command: string, editor: any) => {
                // Check if the command is related to image insertion
                console.log("command", command)
                if (command === "insertImage") {
                    // Get the selected image URL
                    const selectedImage = editor.selection.current()

                    // Check if an image is selected
                    if (selectedImage && selectedImage.tagName === "IMG") {
                        // Open the modal when an image is selected
                        onToggle()
                    }
                }
            },
        },
        uploader: {
            url: `${env.API_BO_ENDPOINT}/media`,
            headers: {
                Authorization: `Bearer ${cookiesStorage.get(CookieStorageKey.ACCESS_TOKEN)}`,
            },
            prepareData: function (data: FormData, file: File, files: File[]) {
                data.delete("source")
                data.delete("path")
                data.append("file", data.get("files[0]") as Blob)
                data.delete("files[0]")
                return data
            },
            isSuccess: function (resp: any) {
                return !resp?.error
            },
            getMsg: function (resp: any) {
                return resp?.msg?.join !== undefined ? resp?.msg?.join(" ") : resp.msg
            },
            process: function (resp: any) {
                return {
                    files: [resp?.link_url],
                    path: resp?.link_url,
                    baseurl: resp?.link_url,
                    error: resp?.error ? 1 : 0,
                    msg: resp?.msg,
                }
            },
            defaultHandlerSuccess: function (data: any, resp: any) {
                const files = data?.files || []
                if (files.length) {
                    this.selection.insertImage(files[0], null, 250)
                }
            },
        } as JoditUploaderConfig, // Add this type assertion
    }

    const handleSelectImage = () => {}

    return (
        <>
            <JoditEditor ref={editor} value={value} config={config} onBlur={(newValue) => onChange(newValue)} />
            <ModalMedia show={visible} onClose={onToggle} onSelectImage={handleSelectImage} />
        </>
    )
}

export default TextEditor
