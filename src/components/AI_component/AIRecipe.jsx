import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export default function AIRecipe(props) {

    return (
        <section>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}