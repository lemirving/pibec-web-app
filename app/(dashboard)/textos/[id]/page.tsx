export default async function TextoPage({ params }: { params: { id: string } }) {
    const {id} = await params
    return (
    <div>
      <h1>Texto {id}</h1>
    </div>
  )
}