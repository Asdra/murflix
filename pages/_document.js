import Document, { Html, Head, Main, NextScript } from 'next/document';
import showContextMenu from '../components/ContextMenu';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="fr">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument