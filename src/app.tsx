import {createRoot} from 'react-dom/client';
import a from "@/util/a";

const App = () => {

    a();

    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    )
}

const root = createRoot(document.body);
root.render(<App/>);