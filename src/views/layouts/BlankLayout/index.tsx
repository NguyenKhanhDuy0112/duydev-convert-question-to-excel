import { ReactNode } from "react";

interface BlankLayoutProps {
    children: ReactNode
}

function BlankLayout(props: BlankLayoutProps) {
    const { children } = props;
    return ( 
        <section>{children}</section>
     );
}

export default BlankLayout;