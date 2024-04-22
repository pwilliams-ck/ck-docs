# Zabbix SNMP Trap Example

This walks through the process of setting up a Zabbix back-end for receiving
SNMP traps. It is assumed Zabbix is already installed on a `.deb` box like
Ubuntu and you have SSH access with root priveleges.

Note: Zabbix will need further configuration from the front-end GUI, for hosts
you wish to obtain traps from.

## Edit zabbix-server.conf

The main config file for a Zabbix server is `/etc/zabbix/zabbix-server.conf`.

Run the following command to edit in Vim.

```bash
vim /etc/zabbix/zabbix-server.conf
```

### Search for SNMP

Tip: To search in Vim, from normal mode (this is the default mode when you open
Vim), type `/string`. Replace `string` with the desired text and press enter.

Search for `SNMP`, find the section that looks like this.

```bash
### Option: SNMPTrapperFile
#       Temporary file used for passing data from SNMP trap daemon to the server.
#       Must be the same as in zabbix_trap_receiver.pl or SNMPTT configuration file.
#
# Mandatory: no
# Default:
# SNMPTrapperFile=/tmp/zabbix_traps.tmp

SNMPTrapperFile=/var/log/snmptrap/snmptrap.log

### Option: StartSNMPTrapper
#       If 1, SNMP trapper process is started.
#
# Mandatory: no
# Range: 0-1
# Default:
# StartSNMPTrapper=0

### Option: ListenIP
#       List of comma delimited IP addresses that the trapper should listen on.
#       Trapper will listen on all network interfaces if this parameter is missing.
#
# Mandatory: no
# Default:
# ListenIP=0.0.0.0
```

#### Make 3 changes

- Uncomment --> `# SNMPTrapperFile=/tmp/zabbix_traps.tmp`
- Comment out --> `SNMPTrapperFile=/var/log/snmptrap/snmptrap.log`
- Uncomment and change value from 0 to 1 --> `# StartSNMPTrapper=0`

It should now look like the following.

```bash
### Option: SNMPTrapperFile
#       Temporary file used for passing data from SNMP trap daemon to the server.
#       Must be the same as in zabbix_trap_receiver.pl or SNMPTT configuration file.
#
# Mandatory: no
# Default:
SNMPTrapperFile=/tmp/zabbix_traps.tmp

# SNMPTrapperFile=/var/log/snmptrap/snmptrap.log

### Option: StartSNMPTrapper
#       If 1, SNMP trapper process is started.
#
# Mandatory: no
# Range: 0-1
# Default:
StartSNMPTrapper=1

### Option: ListenIP
#       List of comma delimited IP addresses that the trapper should listen on.
#       Trapper will listen on all network interfaces if this parameter is missing.
#
# Mandatory: no
# Default:
# ListenIP=0.0.0.0
```

After confirming changes, type `:wq` + `return` to save and exit.

### Restart Zabbix service

Go ahead and restart the `zabbix-server` service, don't forget `sudo` if you are
not loggend in as root.

```bash
systemctl restart zabbix-server
```

## Zabbix trap receiver

Place the following Perl script in `/usr/bin/zabbix_trap_receiver.pl`.

Note: This script is meant for Zabbix 6.0, please use the proper script for the
version you are working with. Get it directly from Zabbix
[here](https://git.zabbix.com/projects/ZBX/repos/zabbix/raw/misc/snmptrap/zabbix_trap_receiver.pl).

```perl
#!/usr/bin/perl

#
# Zabbix
# Copyright (C) 2000-2011 Zabbix SIA
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#

#########################################
#### ABOUT ZABBIX SNMP TRAP RECEIVER ####
#########################################

# This is an embedded perl SNMP trapper receiver designed for sending data to the server.
# The receiver will pass the received SNMP traps to Zabbix server or proxy running on the
# same machine. Please configure the server/proxy accordingly.
#
# Read more about using embedded perl with Net-SNMP:
#	http://net-snmp.sourceforge.net/wiki/index.php/Tut:Extending_snmpd_using_perl

#################################################
#### ZABBIX SNMP TRAP RECEIVER CONFIGURATION ####
#################################################

### Option: SNMPTrapperFile
#	Temporary file used for passing data to the server (or proxy). Must be the same
#	as in the server (or proxy) configuration file.
#
# Mandatory: yes
# Default:
$SNMPTrapperFile = '/tmp/zabbix_traps.tmp';

### Option: DateTimeFormat
#	The date time format in strftime() format. Please make sure to have a corresponding
#	log time format for the SNMP trap items.
#
# Mandatory: yes
# Default:
$DateTimeFormat = '%H:%M:%S %Y/%m/%d';

###################################
#### ZABBIX SNMP TRAP RECEIVER ####
###################################

use Fcntl qw(O_WRONLY O_APPEND O_CREAT);
use POSIX qw(strftime);

sub zabbix_receiver
{
	my (%pdu_info) = %{$_[0]};
	my (@varbinds) = @{$_[1]};

	# open the output file
	unless (sysopen(OUTPUT_FILE, $SNMPTrapperFile, O_WRONLY|O_APPEND|O_CREAT, 0666))
	{
		print STDERR "Cannot open [$SNMPTrapperFile]: $!\n";
		return NETSNMPTRAPD_HANDLER_FAIL;
	}

	# get the host name
	my $hostname = $pdu_info{'receivedfrom'} || 'unknown';
	if ($hostname ne 'unknown') {
		$hostname =~ /\[(.*?)\].*/;                    # format: "UDP: [127.0.0.1]:41070->[127.0.0.1]"
		$hostname = $1 || 'unknown';
	}

	# print trap header
	#       timestamp must be placed at the beggining of the first line (can be omitted)
	#       the first line must include the header "ZBXTRAP [IP/DNS address] "
	#              * IP/DNS address is the used to find the corresponding SNMP trap items
	#              * this header will be cut during processing (will not appear in the item value)
	printf OUTPUT_FILE "%s ZBXTRAP %s\n", strftime($DateTimeFormat, localtime), $hostname;

	# print the PDU info
	print OUTPUT_FILE "PDU INFO:\n";
	foreach my $key(keys(%pdu_info))
	{
		printf OUTPUT_FILE "  %-30s %s\n", $key, $pdu_info{$key};
	}

	# print the variable bindings:
	print OUTPUT_FILE "VARBINDS:\n";
	foreach my $x (@varbinds)
	{
		printf OUTPUT_FILE "  %-30s type=%-2d value=%s\n", $x->[0], $x->[2], $x->[1];
	}

	close (OUTPUT_FILE);

	return NETSNMPTRAPD_HANDLER_OK;
}

NetSNMP::TrapReceiver::register("all", \&zabbix_receiver) or
	die "failed to register Zabbix SNMP trap receiver\n";

print STDOUT "Loaded Zabbix SNMP trap receiver\n";
```

### Give Perl script execute permissions

```bash
chmod a+x /usr/bin/zabbix_trap_receiver.pl
```

Note: If there are errors when running the Perl script, install the following.

```bash
apt install -y perl libxml-simple-perl libsnmp-perl
```

## Install & configure snmptrapd

```bash
apt install -y snmp snmp-mibs-downloader snmptrapd
```

### Edit snmptrapd config file

```bash
vim /etc/snmp/snmptrapd.conf
```

#### Add the following

Make sure to replace `public` with the proper community string for your systems.

```bash
authCommunity execute public
perl do "/usr/bin/zabbix_trap_receiver.pl";
```

#### Enable MIB Descriptions

Descriptions can be included with received trap messages. This is optional but
helps diagnose alerts quicker, edit snmp config file.

```bash
vim /etc/snmp/snmpd.conf
```

Comment out the following line so it looks like below.

```bash
# mibs :
```

### Restart Zabbix and snmptrapd services

```bash
systemctl restart zabbix-server
systemctl restart snmptrapd
```

### Testing

This should now have the Zabbix server ready to receive traps from hosts, test
locally with the following.

```bash
snmptrap -v 2c -c public localhost '' 1.3.6.1.4.1.9.9.41.2 1.3.6.1.4.1.9.9.41.1.2.3.1.2 s "Test trap"
```

You may want to test from a remote device as well. This should send a trap to
the specified trap log file `/tmp/zabbix_traps.tmp` that was edited in
zabbix-server.conf. Check recent contents with `tail` command.

```bash
tail -f /tmp/zabbix_traps.tmp
```

## Conclusion

If there are issues refer to Zabbix documentation. More configuration related to
regular expressions and Zabbix Triggers needs to be completed in the front end
of Zabbix for traps to work properly with desired hosts.
