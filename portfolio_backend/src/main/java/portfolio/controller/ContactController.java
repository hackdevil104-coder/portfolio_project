package portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfolio.entity.ContactMessage;
import portfolio.service.ContactService;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactService service;

    @PostMapping
    public ContactMessage saveMessage(@RequestBody ContactMessage msg) {
        return service.saveMessage(msg);
    }
}
