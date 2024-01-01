import { Button } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useRouter } from "@/hooks"

interface PageWrapperProps {
    title: React.ReactNode
    hasBackBtn?: boolean
    children: React.ReactNode
    footer?: React.ReactNode
}

function PageWrapper(props: PageWrapperProps) {
    const { title, hasBackBtn, children, footer } = props
    const { navigate } = useRouter()

    return (
        <section className="pageWrapper">
            <h1 className="pageWrapper__title">{title}</h1>
            <section className={`pageWrapper__content ${footer && "pageWrapper__content--has-footer"}`}>
                {hasBackBtn && (
                    <article className="pageWrapper__back">
                        <Button
                            onClick={() => navigate(-1)}
                            className="pageWrapper__back-btn"
                            icon={<LeftOutlined height={2} width={2} />}
                        >
                            Back
                        </Button>
                    </article>
                )}
                <article className={`${hasBackBtn ? "pageWrapper__content-wrapper" : ""}`}>{children}</article>
            </section>
            {footer && <section className="pageWrapper__footer">{footer}</section>}
        </section>
    )
}

export default PageWrapper
