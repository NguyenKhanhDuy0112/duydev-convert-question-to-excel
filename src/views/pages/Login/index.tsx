import { MessageValidateForm, NotificationMessageEnum, NotificationTypeEnum, PageRoute } from "@/enums"

//COMPONENTS
import { Button, Card, Col, Form, Input, Row } from "antd"
import { ReactComponent as LogoIc } from "@/assets/icons/logo.svg"

//MODELS
import { useNotification, useRouter } from "@/hooks"
import { IFormLogin } from "@/models"

//SERVICES
import { useLoginApiMutation } from "@/services/auth.service"
import { useDispatch } from "react-redux"
import { login } from "@/redux/modules/auth/authSlice"

function Login() {
    const [form] = Form.useForm<IFormLogin>()
    const { navigate } = useRouter()
    const { showNotification } = useNotification()
    const dispatch = useDispatch()

    //SERVICES
    const [loginApi, { isLoading }] = useLoginApiMutation()

    const handleSubmitForm = async (value: IFormLogin) => {
        try {
            const response = await loginApi(value).unwrap()

            console.log("response?.access_token: ", response?.access_token)
            dispatch(login({ token: response?.access_token || "" }))
            showNotification({
                type: NotificationTypeEnum.Success,
                message: NotificationMessageEnum.LoginSuccess,
            })
            navigate(PageRoute.Dashboard)
        } catch (err: any) {
            showNotification({
                type: NotificationTypeEnum.Error,
                message: NotificationMessageEnum.LoginError,
            })
        }
    }
    return (
        <section className="login">
            <Card className="login__wrapper">
                <Row justify={"center"} gutter={16}>
                    <Col span={24}>
                        <div className="d-flex justify-center items-center">
                            <LogoIc />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="login__header">
                            <h1 className="login__title text-center">Welcome</h1>
                            <p className="login__des text-center">Enter your email and password below.</p>
                        </div>
                    </Col>
                </Row>
                <Form onFinish={handleSubmitForm} autoComplete="off" layout="vertical" form={form}>
                    <Form.Item
                        rules={[
                            { required: true, message: MessageValidateForm.Required },
                            { type: "email", message: MessageValidateForm.InvalidEmail },
                        ]}
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: MessageValidateForm.Required }]}
                        label="Password"
                        name="password"
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Button loading={isLoading} htmlType="submit" className="login__btn" type="primary">
                        Login
                    </Button>
                </Form>
            </Card>
        </section>
    )
}

export default Login
