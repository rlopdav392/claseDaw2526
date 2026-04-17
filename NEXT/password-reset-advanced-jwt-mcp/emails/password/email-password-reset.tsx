import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type PasswordResetEmailProps = {
  toName: string;
  url: string;
};

const PasswordResetEmail = ({ toName, url }: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Restablecer contraseña — enlace seguro</Preview>
      <Tailwind>
        <Body className="m-8 font-sans text-center">
          <Container>
            <Section>
              <Text>
                Hola {toName}, has solicitado restablecer tu contraseña. Pulsa el
                botón para elegir una nueva.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="inline-block rounded bg-black px-4 py-2 text-white"
              >
                Restablecer contraseña
              </Button>
            </Section>
            <Section>
              <Text className="text-xs text-slate-500">
                Si no has sido tú, ignora este correo.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  toName: "Usuario",
  url: "http://localhost:3000/reset-password/ejemplo",
} satisfies PasswordResetEmailProps;

export default PasswordResetEmail;
