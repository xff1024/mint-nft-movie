import { Button, Switch } from "antd";
import "./index.scss";
import useActiveWeb3 from "../../hooks/useActiveWeb3";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export default function AppHeader() {
  const { account } = useActiveWeb3();
  const { login: connect } = useAuth();

  useEffect(() => {
    if (window.ethereum.selectedAddress) {
      connect();
    }
  }, [connect]);

  return (
    <div className="app-header">
      <span className="app-header-title">Theme </span>
      <Switch
        checkedChildren="Light"
        unCheckedChildren="Dark"
        defaultChecked
        onChange={(checked) => {
          document.body.className = checked ? "light" : "dark";
        }}
      />
      <div className="connect-wallet">
        {account ? (
          <span className="account">{account}</span>
        ) : (
          <Button type="primary" onClick={() => connect()}>
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
}
