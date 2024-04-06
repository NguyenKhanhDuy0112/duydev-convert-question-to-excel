import { AnswerTypeEnum, NotificationMessageEnum, NotificationTypeEnum } from "@/enums"
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd"
import { useEffect, useRef, useState } from "react"
import QuestionPreview from "./components/QuestionPreview"
import { PlusOutlined, FileExcelOutlined, CloseOutlined } from "@ant-design/icons"
import { GenerateQuestionAnswerTemplate } from "@/models"
import * as XLSX from "xlsx"
import { useNotification } from "@/hooks"
import { v4 as uuidv4 } from "uuid"

interface IQuestionTemplate {
    id: any
    title: string
    answers: string[]
    correctAnswer: number[]
    typeAnswer: AnswerTypeEnum | null
}
function Home() {
    const questionsUniqueRef = useRef<IQuestionTemplate[]>([
        {
            id: uuidv4(),
            answers: [],
            typeAnswer: null,
            correctAnswer: [],
            title: "",
        },
    ])
    const [questionsUnique, setQuestionsUnique] = useState<IQuestionTemplate[]>([
        {
            id: uuidv4(),
            answers: [],
            typeAnswer: null,
            correctAnswer: [],
            title: "",
        },
    ])
    const [form] = Form.useForm()
    const { showNotification } = useNotification()

    useEffect(() => {
        questionsUniqueRef.current = questionsUnique
    }, [questionsUnique])

    const handleChangeQuestion = (id: string, value: string) => {
        const newQuestions = [...questionsUnique]
        const findIndex = newQuestions.findIndex((f) => f?.id === id)
        newQuestions[findIndex].title = value
        setQuestionsUnique(newQuestions)
    }

    const handleAddQuestion = () => {
        const newQuestions = [...questionsUnique]
        newQuestions.push({
            id: uuidv4(),
            answers: [],
            typeAnswer: null,
            correctAnswer: [],
            title: "",
        })
        questionsUniqueRef.current = newQuestions
        setQuestionsUnique(newQuestions)
    }

    const handleChangeAnswerType = (id: string, value: AnswerTypeEnum) => {
        const newQuestions = [...questionsUnique]
        const findIndex = newQuestions.findIndex((f) => f?.id === id)
        newQuestions[findIndex].typeAnswer = value
        questionsUniqueRef.current = newQuestions
        setQuestionsUnique(newQuestions)
    }

    const handleExportFile = (fileType: "csv" | "xlsx") => {
        form.submit()
        GenerateQuestionAnswerTemplate.categoryName = form.getFieldValue("category")
        GenerateQuestionAnswerTemplate.indexFile = form.getFieldValue("index")

        const dataMap = questionsUnique?.map((item: IQuestionTemplate) => {
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
        const range = XLSX.utils.decode_range(worksheet["!ref"] as any)
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = { c: C, r: R }
                if (!worksheet[XLSX.utils.encode_cell(cell_address)]) continue

                const cell = worksheet[XLSX.utils.encode_cell(cell_address)]
                cell.s = { alignment: { wrapText: true } }
            }
        }
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        XLSX.writeFile(
            workbook,
            `${GenerateQuestionAnswerTemplate.indexFile?.trim()}_${GenerateQuestionAnswerTemplate.categoryName?.trim()}.${fileType}`
        )
    }

    const handleReset = () => {
        form.resetFields()
        questionsUniqueRef.current = [
            {
                id: uuidv4(),
                answers: [],
                typeAnswer: null,
                correctAnswer: [],
                title: "",
            },
        ]
        setQuestionsUnique([
            {
                id: uuidv4(),
                answers: [],
                typeAnswer: null,
                correctAnswer: [],
                title: "",
            },
        ])
        GenerateQuestionAnswerTemplate.categoryName = ""
        GenerateQuestionAnswerTemplate.indexFile = ""
    }

    const handleRemoveQuestion = (id: string) => {
        const newQuestions = [...questionsUnique].filter((item, i) => item?.id !== id)
        questionsUniqueRef.current = newQuestions
        setQuestionsUnique(newQuestions)
    }

    console.log("questions render: ", questionsUnique)
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
                        {questionsUnique?.map((item, index) => (
                            <Col key={item?.id} span={24}>
                                <Card
                                    className="w-100"
                                    extra={
                                        <>
                                            {index !== 0 ? (
                                                <Button
                                                    style={{ backgroundColor: "#b32020" }}
                                                    onClick={() => handleRemoveQuestion(item?.id)}
                                                    icon={<CloseOutlined />}
                                                    type="primary"
                                                ></Button>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    }
                                >
                                    <span className="float-question">{index + 1}</span>
                                    <Select
                                        placeholder="Select answer type"
                                        className="w-100 m-b-4"
                                        value={item.typeAnswer}
                                        style={{ height: "40px" }}
                                        onChange={(value) => handleChangeAnswerType(item?.id, value)}
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
                                                onChange={(e) => handleChangeQuestion(item?.id, e?.target?.value)}
                                                className="m-b-4"
                                            />
                                            <QuestionPreview
                                                onChange={(answers: string[], correctAnswer: number[]) => {
                                                    const newQuestions = [...questionsUniqueRef.current]

                                                    const findIndex = newQuestions.findIndex((f) => f?.id === item?.id)
                                                    newQuestions[findIndex].answers = answers
                                                    newQuestions[findIndex].correctAnswer = correctAnswer

                                                    setQuestionsUnique(newQuestions)
                                                }}
                                                onChangeAnswer={(answers: string[]) => {
                                                    const newQuestions = [...questionsUnique]
                                                    const findIndex = newQuestions.findIndex((f) => f?.id === item?.id)
                                                    newQuestions[findIndex].answers = answers
                                                    questionsUniqueRef.current = newQuestions
                                                    setQuestionsUnique(newQuestions)
                                                    console.log(index)
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
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
