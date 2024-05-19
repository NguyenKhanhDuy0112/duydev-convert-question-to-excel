import { ConfigProvider } from "antd"
import "@/views/styles/_index.scss"
import "react-quill/dist/quill.snow.css"
import ManageRoutes from "./routes"
import { Provider } from "react-redux"
import { App as AppAntd } from "antd"
import store from "@/redux/index.store"
import { env } from "./constants"
function App() {
    console.log("REACT_APP_API_BO_ENDPOINT: ", "env: ", env.API_BO_ENDPOINT)
    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "rgb(13, 134, 245)",
                        colorLink: "#A13355",
                    },
                    components: {
                        Button: {
                            colorPrimary: "rgb(13, 134, 245)",
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
