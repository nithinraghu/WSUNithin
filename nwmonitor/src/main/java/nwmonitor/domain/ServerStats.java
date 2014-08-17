package nwmonitor.domain;

public class ServerStats {
	
	private String measureName;
	
	private int criticalCount;
	
	private int warningCount;
	
	private int okCount;
	
	public ServerStats(String mName, int critCount, int warnCount, int okCnt)
	{
		this.measureName = mName;
		this.criticalCount = critCount;
		this.warningCount = warnCount;
		this.okCount = okCnt;
	}
}
