import './sidebardesign.css';

export const sidebarNavItems = [
    {
        display: 'Antiques',
        icon: <i className='bx bx-home'></i>,
        section: ''
    },
    {
        display: 'Currency',
        icon: <i className='bx bx-star'></i>,
        section: 'started'
    },
    {
        display: 'Services',
        icon: <i className='bx bx-calendar'></i>,
        section: 'calendar'
    },
    {
        display: 'Watches',
        icon: <i className='bx bx-user'></i>,
        section: 'user'
    },
    {
        display: 'Collectibles',
        icon: <i className='bx bx-receipt'></i>,
        section: 'order'
    },
    {
        display: 'Electronics',
        icon: <i className='bx bx-home'></i>,
        section: ''
    },
    {
        display: 'Celebrity ownings',
        icon: <i className='bx bx-star'></i>,
        section: 'started'
    },
    {
        display: 'Books',
        icon: <i className='bx bx-calendar'></i>,
        section: 'calendar'
    },
    {
        display: 'Watches',
        icon: <i className='bx bx-user'></i>,
        section: 'user'
    },
    {
        display: 'Instruments',
        icon: <i className='bx bx-receipt'></i>,
        section: 'order'
    }
]

const Sidebar = () => {
    return <div className='sidebar'>
        <div className="sidebarTitle">
            choose category
        </div>
        <div className="sidebarMenu">
            {
                sidebarNavItems.map((item, index) => (
                        <div className="sidebarMenuItem" key={index}>
                            <div className="sidebarText">
                                {item.display}
                            </div>
                        </div>
                ))
            }

            <div className='searchMinMax'>
                <div className='searchMin'>
                    <span>min</span>
                    <input className='minMaxInput' type="text" />
                </div>
                <div className='searchMax'>
                    <span>max</span>
                    <input className='minMaxInput' type="text" />
                </div>
            </div>
            <button className='minMaxSearch'>search</button>
        </div>
    </div>;
};

export default Sidebar;