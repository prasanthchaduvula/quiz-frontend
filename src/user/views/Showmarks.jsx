import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../state/actions/user.actions';
class Showmarks extends React.Component {
  constructor() {
    super();
    this.state = {
      totalmarks: ''
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }
  render() {
    let { totalmarks } = this.props;
    return (
      <>
        <div className="showmarks-section">
          {totalmarks.length ? (
            <>
              <p className="showmarks-heading">Showing all test marks</p>
              <table className="showmarks-table">
                <tr className="showmarks-table-th">
                  <th>So.No</th>
                  <th>Quizset Name</th>
                  <th>Total Mark</th>
                  <th>Marks secured</th>
                  <th>Appeared on</th>
                </tr>
                {totalmarks &&
                  totalmarks.map((marks, index) => (
                    <tr>
                      <td className="showmarks-table-td">{index + 1}</td>
                      <td className="showmarks-table-td">
                        {marks.quizsetName}
                      </td>
                      <td className="showmarks-table-td">{marks.totalmark}</td>
                      <td className="showmarks-table-td">{marks.mark}</td>

                      <td className="showmarks-table-td">
                        {' '}
                        {new Intl.DateTimeFormat('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        }).format(new Date(marks.createdAt))}
                      </td>
                    </tr>
                  ))}
              </table>
            </>
          ) : (
            <p className="showmarks-heading">No quiz test appeared</p>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { totalmarks: store.user.marks };
}

export default connect(mapStateToProps)(Showmarks);
