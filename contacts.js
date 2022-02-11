const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const contactsPath = require('./db/contacts.json')

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, './db/contacts.json'),
    'utf8',
  )
  const result = JSON.parse(content)
  return result
}

async function listContacts() {
  return await readContent()
}

async function getContactById(contactId) {
  const contacts = await readContent()
  const contact = contacts.find((c) => c.id === contactId)
  return contact ? contact : null
}

async function removeContact(contactId) {
    const contacts = await readContent()
    let idx = 0
    contacts.forEach(element => {
      if (element.id === contactId) {
        idx = contacts.indexOf(element)
        return idx
      }
    }); 
    contacts.splice(idx, 1)
    await fs.writeFile(
      path.join(__dirname, './db/contacts.json'),
      JSON.stringify(contacts, null, 2),
    )
    return contacts
}

async function addContact(name, email, phone) {
  const contacts = await readContent()
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, './db/contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }