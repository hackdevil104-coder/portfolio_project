package portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfolio.entity.ContactMessage;
import portfolio.repository.ContactRepository;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // ✅ CREATE (Save message)
    @PostMapping
    public ContactMessage saveMessage(@RequestBody ContactMessage msg) {
        return contactRepository.save(msg);
    }

    // ✅ READ ALL (Admin view)
    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }

    // ✅ READ BY ID
    @GetMapping("/{id}")
    public ContactMessage getMessageById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
    }

    // ✅ UPDATE MESSAGE
    @PutMapping("/{id}")
    public ContactMessage updateMessage(
            @PathVariable Long id,
            @RequestBody ContactMessage updatedMsg) {

        ContactMessage msg = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        msg.setName(updatedMsg.getName());
        msg.setSubject(updatedMsg.getSubject());
        msg.setMobile(updatedMsg.getMobile());
        msg.setEmail(updatedMsg.getEmail());
        msg.setMessage(updatedMsg.getMessage());

        return contactRepository.save(msg);
    }

    // ✅ DELETE MESSAGE
    @DeleteMapping("/{id}")
    public String deleteMessage(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return "Message deleted successfully";
    }
}
