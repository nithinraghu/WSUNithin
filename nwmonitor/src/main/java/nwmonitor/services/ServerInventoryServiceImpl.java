package nwmonitor.services;

import java.util.List;

import org.springframework.stereotype.Component;

import nwmonitor.domain.Server;


@Component
public class ServerInventoryServiceImpl implements ServerInventoryService{

	/**
	 *        
	 */
	public List<Server> getAllServers() {		
		return ServerCollection.getInstance().getAllServers();
	}

}
