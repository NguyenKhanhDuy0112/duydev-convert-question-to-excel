import { useEffect, useRef } from "react"
import ReactQuill from "react-quill"
import ModalMedia from "../ModalMedia"
import { useModal } from "@/hooks"

interface EditorProps {
    value: string
    onChange: (value: string) => void
}

function Editor(props: EditorProps) {
    const { value, onChange } = props
    const quillRef = useRef<ReactQuill>(null)
    const { visible, toggle } = useModal()
    const imageHandler = () => {}

    useEffect(() => {
        // @ts-ignore
        quillRef.current
            .getEditor()
            .getModule("toolbar")
            .addHandler("image", () => {
                toggle()
            })
    }, [quillRef])

    const handleInsertImage = (image: string) => {
        const quill = quillRef.current
        if (quill) {
            const range = quill.getEditorSelection()
            range && quill.getEditor().insertEmbed(range.index, "image", image)
            toggle()
        }
    }

    return (
        <>
            <ReactQuill
                ref={quillRef}
                value={value}
                modules={{
                    toolbar: {
                        container: [
                            [{ header: [1, 2, false] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                            ["link", "image"],
                            [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
                        ],
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                onChange={onChange}
            />
            <ModalMedia show={visible} onClose={toggle} onSelectImage={handleInsertImage} />
        </>
    )
}

export default Editor
