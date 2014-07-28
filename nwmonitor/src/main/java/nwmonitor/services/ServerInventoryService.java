package nwmonitor.services;

import java.util.List;

import nwmonitor.domain.Server;

public interface ServerInventoryService {
	
	List<Server> getAllServers();

}
