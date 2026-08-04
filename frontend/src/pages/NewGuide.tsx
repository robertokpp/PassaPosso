export function NewGuide() {
  return (
    <div>
      <h1>Funcionando</h1>

      <div className="w-full bg-white p-4">
        <strong>Informações do guia</strong>
        <form action="">
          <label htmlFor=""></label>
          <fieldset>
            <legend className="uppercase">Título *</legend>
            <input type="text" className="w-full border" />
          </fieldset>
          <fieldset>
            <legend className="uppercase">Título *</legend>
            <input type="text" className="w-full border" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
