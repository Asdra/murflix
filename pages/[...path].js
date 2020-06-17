import dynamic from 'next/dynamic'
const Main = dynamic(() => import('../components/Main'), {
    ssr: false
});

const Index = () => {
    return <Main />;
}

export default Index;