import { AnswerTrueFalseEnum, AnswerTypeEnum } from "@/enums"
import { Button, Checkbox, Input, Radio, Space } from "antd"
import { useMemo, useState } from "react"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"

interface QuestionPreviewProps {
    onChange: (answers: string[], correctAnswer: number[]) => void
    typeAnswer: AnswerTypeEnum
    onChangeAnswer: (answers: string[]) => void
}
function QuestionPreview(props: QuestionPreviewProps) {
    const { onChange, typeAnswer, onChangeAnswer } = props
    const [answersPreview, setAnswersPreview] = useState<string[]>([""])

    const handleAddOrRemoveAnswer = (index: number) => {
        if (index === 0) {
            setAnswersPreview([...answersPreview, ""])
        } else {
            setAnswersPreview(answersPreview.filter((item, i) => i !== index))
        }
    }

    const handleChangeAnswer = (index: number, value: string) => {
        const newAnswers = [...answersPreview]
        newAnswers[index] = value
        setAnswersPreview(newAnswers)
        onChangeAnswer(newAnswers)
    }

    const handleChangeRadio = (e: number) => {
        onChange(answersPreview, [e])
    }

    const handleChangeCheckbox = (e: number[]) => {
        onChange(answersPreview, e)
    }

    const generateAnswer = useMemo(() => {
        switch (typeAnswer) {
            case AnswerTypeEnum.TrueFalse:
                return (
                    <Radio.Group onChange={(e) => handleChangeRadio(Number(e.target.value))}>
                        <Space direction="vertical">
                            <Radio value={AnswerTrueFalseEnum.True}>True</Radio>
                            <Radio value={AnswerTrueFalseEnum.False}>False</Radio>
                        </Space>
                    </Radio.Group>
                )
            case AnswerTypeEnum.Normal:
                return (
                    <Radio.Group className="w-100" onChange={(e) => handleChangeRadio(Number(e.target.value))}>
                        <Space direction="vertical">
                            {answersPreview?.map((item: any, index: number) => (
                                <Radio className="w-100" key={index} value={index + 1}>
                                    <div className="d-flex items-center">
                                        <Input
                                            key={index}
                                            placeholder="Enter answer"
                                            className="w-100"
                                            onChange={(e) => handleChangeAnswer(index, e?.target?.value)}
                                        />
                                        <Button
                                            type="primary"
                                            className="m-l-3"
                                            style={{ backgroundColor: index === 0 ? "#0d86f5" : "rgb(245, 109, 13)" }}
                                            onClick={() => handleAddOrRemoveAnswer(index)}
                                            icon={index === 0 ? <PlusOutlined /> : <MinusOutlined />}
                                        ></Button>
                                    </div>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                )
            case AnswerTypeEnum.MultipleChoice:
                return (
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={(checkedValue) => handleChangeCheckbox(checkedValue?.map((item) => Number(item)))}
                    >
                        <Space direction="vertical">
                            {answersPreview?.map((item: any, index: number) => (
                                <Checkbox className="w-100" key={index} value={index + 1}>
                                    <div className="d-flex items-center">
                                        <Input
                                            placeholder="Enter answer"
                                            className="w-100"
                                            key={index}
                                            onChange={(e) => handleChangeAnswer(index, e?.target?.value)}
                                        />
                                        <Button
                                            type="primary"
                                            className="m-l-3"
                                            onClick={() => handleAddOrRemoveAnswer(index)}
                                            icon={index === 0 ? <PlusOutlined /> : <MinusOutlined />}
                                        ></Button>
                                    </div>
                                </Checkbox>
                            ))}
                        </Space>
                    </Checkbox.Group>
                )
        }
    }, [typeAnswer, answersPreview])

    return (
        <div className="question-preview">
            <div className="question-preview__description">{generateAnswer}</div>
        </div>
    )
}

export default QuestionPreview
