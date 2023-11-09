import "./topbar.css";
import {Person} from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className = "topbarContainer">
        <div className = "topbarLeft">
            <span className = "logo">Logo</span>
        </div>
        <div className = "topbarCenter">
            <div className = "searchbar">
                <input placeholder = "Search for friend, post and video" className="searchInput"></input>
            </div>
        </div>
        <div className = "topbarRight">
          <div className = "topbarLinks"> 
            <span className = "topbarLink">Homepage</span>
            <span className = "topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img src="/assets/tmp.png" className="topbarImg"/>
        </div>

    </div>
  )
}
