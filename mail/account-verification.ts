export function verifyMailHTMLTemplate(url: string) {
  return `
      <body style="background: '#f9f9f9'">
        <table
          width="100%"
          border="0"
          cellspacing="20"
          cellpadding="0"
          style="
            background: '#fff';
            max-width: 600px;
            margin: auto;
            border-radius: 10px;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding: 10px 0px;
                font-size: 22px;
                font-family: Helvetica, Arial, sans-serif;
                color: '#444';
              "
            >
              Confirma tu cuenta en
              <strong>
                <a
                  href="https://www.subterra.app/"
                  style="color: '#346df1'; text-decoration: none"
                  >Subterra.app</a
                >
              </strong>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="padding: 20px 0"
            >
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td
                    align="center"
                    style="border-radius: 8px"
                    bgcolor="#e11d48"
                  >
                    <a
                      href="${url}"
                      target="_blank"
                      style="
                        font-size: 18px;
                        font-family: Helvetica, Arial, sans-serif;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        padding: 10px 20px;
                        border: 1px solid '#346df1';
                        display: inline-block;
                        font-weight: bold;
                      "
                    >
                      Confirmar
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                padding: 0px 0px 10px 0px;
                font-size: 16px;
                line-height: 22px;
                font-family: Helvetica, Arial, sans-serif;
                color: '#444';
              "
            >
              Si no has solicitado este correo, por favor ignóralo. Tu información
              está segura.
            </td>
          </tr>
        </table>
      </body>
  `
}

export function verifyMailTextTemplate(url: string, host: string) {
  return `Iniciar sesión en ${host}\n${url}\n\n`
}
