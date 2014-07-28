package nwmonitor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import nwmonitor.domain.Server;

@Component
public class ServerInventoryServiceImpl implements ServerInventoryService{

	public List<Server> getAllServers() {
		List<Server> servers = new ArrayList<Server>();
		Server server1 = new Server("10.20.6.1");
		servers.add(server1);
		Server server2 = new Server("10.20.6.2");
		servers.add(server2);
		return servers;
		
	}

}
