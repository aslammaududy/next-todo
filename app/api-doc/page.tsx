import { getApiDocs } from '@/lib/swagger';

import ReactSwagger from './react-swagger';

export default async function IndexPage() {
    const spec = await getApiDocs();
    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-center -mt-16">
            <ReactSwagger spec={spec} />
        </section>
    );
}