export const getToken = async (
  email: string,
  password: string
): Promise<string> => {
  //artificial delay
  //throw new Error("movidón");
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return new Promise((resolve) => {
    resolve(`tokenroro: ${email} ${password}`);
  });
};
