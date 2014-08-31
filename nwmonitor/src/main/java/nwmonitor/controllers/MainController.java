package nwmonitor.controllers;

import java.util.List;

import nwmonitor.domain.Server;
import nwmonitor.services.ServerInventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class MainController {
	
	@Autowired
	private ServerInventoryService inventoryService;
	

	public void setInventoryService(ServerInventoryService inventoryService) {
		this.inventoryService = inventoryService;
	}


	@RequestMapping("/servers")
	@ResponseBody
	public List<Server> getAllServers(){
		return inventoryService.getAllServers();
	}

}
