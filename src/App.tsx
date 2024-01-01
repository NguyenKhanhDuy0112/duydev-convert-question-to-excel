import { ConfigProvider } from "antd"
import "@/views/styles/_index.scss"
import "react-quill/dist/quill.snow.css"
import ManageRoutes from "./routes"
import { Provider } from "react-redux"
import { App as AppAntd } from "antd"
import store from "@/redux/index.store"

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#A13355",
                        colorLink: "#A13355",
                    },
                    components: {
                        Button: {
                            colorPrimary: "#A13355",
                            colorFillSecondary: "#FFE3ED",
                        },
                    },
                }}
            >
                <AppAntd message={{ maxCount: 1, duration: 5000 }} notification={{ placement: "topRight" }}>
                    <ManageRoutes />
                </AppAntd>
            </ConfigProvider>
        </Provider>
    )
}

export default App
