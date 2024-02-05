
const page = ({ params }: { params: { id: string } }) => {

    console.log(params.id)

    return (
        <div>Pool ID: {params.id}</div>
    )
}

export default page