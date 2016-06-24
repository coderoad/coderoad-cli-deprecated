export default function getValidationMessages(title: string, validation: PJErrors[], color: any) {
  if (validation && validation.length) {
    validation.forEach((e, index) => {
      console.log(
        color(`${index + 1}. ${title}: "${e.name}" ${e.msg}.
        Example: ${e.example}
`));
    });
    return false;
  }
  return true;
}
