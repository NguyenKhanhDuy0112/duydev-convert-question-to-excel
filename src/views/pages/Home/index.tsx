import { AnswerTypeEnum, NotificationMessageEnum, NotificationTypeEnum } from "@/enums"
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd"
import { useState } from "react"
import QuestionPreview from "./components/QuestionPreview"
import { PlusOutlined, FileExcelOutlined, CloseOutlined } from "@ant-design/icons"
import { GenerateQuestionAnswerTemplate } from "@/models"
import * as XLSX from "xlsx"
import { useNotification } from "@/hooks"

interface IQuestionTemplate {
    title: string
    answers: string[]
    correctAnswer: number[]
    typeAnswer: AnswerTypeEnum | null
}
function Home() {
    const [questions, setQuestions] = useState<IQuestionTemplate[]>([
        {
            answers: [],
            typeAnswer: null,
            correctAnswer: [],
            title: "",
        },
    ])
    const [form] = Form.useForm()
    const { showNotification } = useNotification()

    const handleChangeQuestion = (index: number, value: string) => {
        const newQuestions = [...questions]
        newQuestions[index].title = value
        setQuestions(newQuestions)
    }

    const handleAddQuestion = () => {
        const newQuestions = [...questions]
        newQuestions.push({
            answers: [],
            typeAnswer: null,
            correctAnswer: [],
            title: "",
        })
        setQuestions(newQuestions)
    }

    const handleChangeAnswerType = (index: number, value: AnswerTypeEnum) => {
        const newQuestions = [...questions]
        newQuestions[index].typeAnswer = value
        setQuestions(newQuestions)
    }

    const handleExportFile = (fileType: "csv" | "xlsx") => {
        //check require answer and title in question
        // const isInvalid = questions?.some((item) => !item?.title || !item?.answers?.length)
        // if (isInvalid) {
        //     showNotification({
        //         type: NotificationTypeEnum.Error,
        //         message: "Failed",
        //     })
        //     return
        // }
        // //check answer has value and not null in question
        // const isInvalidAnswer = questions?.some((item) => item?.answers?.some((answer) => !answer))
        // if (isInvalidAnswer) {
        //     showNotification({
        //         type: NotificationTypeEnum.Error,
        //         message: "Failed",
        //     })
        //     return
        // }

        form.submit()
        GenerateQuestionAnswerTemplate.categoryName = form.getFieldValue("category")
        GenerateQuestionAnswerTemplate.indexFile = form.getFieldValue("index")

        const dataMap = questions?.map((item: IQuestionTemplate) => {
            const templateRecord = GenerateQuestionAnswerTemplate.generateAnswerTemplate(
                item?.typeAnswer as AnswerTypeEnum,
                item?.answers,
                item?.title,
                item?.correctAnswer
            )
            return {
                title: templateRecord?.title,
                isMultipleChoice: templateRecord?.isMultipleChoice,
                questionAnswerTemplates: templateRecord?.questionAnswerTemplates,
                category: templateRecord?.category,
            }
        })
        const worksheet = XLSX.utils.json_to_sheet(dataMap)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        XLSX.writeFile(
            workbook,
            `${GenerateQuestionAnswerTemplate.indexFile}_${GenerateQuestionAnswerTemplate.categoryName}.${fileType}`
        )
    }

    const handleReset = () => {
        form.resetFields()
        setQuestions([
            {
                answers: [],
                typeAnswer: null,
                correctAnswer: [],
                title: "",
            },
        ])
        GenerateQuestionAnswerTemplate.categoryName = ""
        GenerateQuestionAnswerTemplate.indexFile = ""
    }

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = [...questions].filter((item, i) => i !== index)
        setQuestions(newQuestions)
    }

    return (
        <div
            className="container"
            style={{
                backgroundSize: "cover",
                minHeight: "100vh",
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1558236714-d1a6333fce68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN1dGV8ZW58MHx8MHx8fDA%3D)",
            }}
        >
            <div className="form-question">
                <h1 className="m-b-6 text-center">Hello, I'm Duy 🥳</h1>
                <Form form={form} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card className="w-100">
                                <Row gutter={[16, 16]} className="flex items-center">
                                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                        <Form.Item label="Index file" style={{ marginBottom: 0 }} name={"index"}>
                                            <Input placeholder="Enter index file..." />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                        <Form.Item label="Category" style={{ marginBottom: 0 }} name={"category"}>
                                            <Input placeholder="Enter category name..." />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        {questions?.map((item, index) => (
                            <Col span={24}>
                                <Card
                                    className="w-100"
                                    extra={
                                        <>
                                            {index !== 0 ? (
                                                <Button
                                                    style={{ backgroundColor: "#b32020" }}
                                                    onClick={() => handleRemoveQuestion(index)}
                                                    icon={<CloseOutlined />}
                                                    type="primary"
                                                ></Button>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    }
                                >
                                    <Select
                                        placeholder="Select answer type"
                                        className="w-100 m-b-4"
                                        value={item.typeAnswer}
                                        style={{ height: "40px" }}
                                        onChange={(value) => handleChangeAnswerType(index, value)}
                                    >
                                        <Select.Option value={AnswerTypeEnum.Normal}>Normal</Select.Option>
                                        <Select.Option value={AnswerTypeEnum.MultipleChoice}>
                                            Multiple Choice
                                        </Select.Option>
                                        <Select.Option value={AnswerTypeEnum.TrueFalse}>True/False</Select.Option>
                                    </Select>
                                    {item.typeAnswer ? (
                                        <>
                                            <Input
                                                placeholder="Question"
                                                value={item.title}
                                                onChange={(e) => handleChangeQuestion(index, e?.target?.value)}
                                                className="m-b-4"
                                            />
                                            <QuestionPreview
                                                onChange={(answers: string[], correctAnswer: number[]) => {
                                                    const newQuestions = [...questions]
                                                    newQuestions[index].answers = answers
                                                    newQuestions[index].correctAnswer = correctAnswer
                                                    setQuestions(newQuestions)
                                                }}
                                                typeAnswer={item.typeAnswer}
                                            />
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </Card>
                            </Col>
                        ))}
                        <Col span={24}>
                            <div className="d-flex justify-center">
                                <Button onClick={handleAddQuestion} type="primary" icon={<PlusOutlined />}>
                                    Add question
                                </Button>
                            </div>
                        </Col>
                        <Divider />
                        <Col span={24}>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Button
                                        onClick={() => handleExportFile("xlsx")}
                                        className="w-100"
                                        type="primary"
                                        style={{ backgroundColor: "green" }}
                                        icon={<FileExcelOutlined />}
                                    >
                                        Download Excel
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        onClick={() => handleExportFile("csv")}
                                        className="w-100"
                                        type="primary"
                                        style={{ backgroundColor: "#0d86f5" }}
                                        icon={<FileExcelOutlined />}
                                    >
                                        Download CSV
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        onClick={handleReset}
                                        className="w-100"
                                        type="primary"
                                        style={{ backgroundColor: "rgb(245 109 13)" }}
                                        icon={<CloseOutlined />}
                                    >
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Home
