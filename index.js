import contactsService from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case "get":
      const getContact = await contactsService.getContactById(id);
      return console.log(getContact);

    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case "remove":
      const deletedMovie = await contactsService.removeContact(id);
      return console.log(deletedMovie);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
